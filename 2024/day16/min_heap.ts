export class MinHeap<T> {
    heapList: T[];
    isSmallerThan: (smallerCandidate: T, largerCandidate: T) => boolean;

    constructor(
        isSmallerThan: (smallerCandidate: T, largerCandidate: T) => boolean,
    ) {
        this.heapList = [undefined];
        this.isSmallerThan = isSmallerThan;
    }

    push(val: T) {
        this.heapList.push(val);

        let valIndex = this.heapList.length - 1;

        if (
            this.heapList[valIndex] === undefined ||
            this.heapList[Math.floor(valIndex / 2)] === undefined ||
            valIndex < 2
        )
            return;

        while (
            this.isSmallerThan(
                this.heapList[valIndex],
                this.heapList[Math.floor(valIndex / 2)],
            ) && valIndex > 1
        ) {
            [this.heapList[valIndex], this.heapList[Math.floor(valIndex / 2)]] =
                [
                    this.heapList[Math.floor(valIndex / 2)],
                    this.heapList[valIndex],
                ];

            valIndex = Math.floor(valIndex / 2);
        }
    }

    pop() {
        const poppedVal = this.heapList[1];

        this.heapList[1] = this.heapList[this.heapList.length - 1];
        this.heapList.splice(this.heapList.length - 1, 1);

        let swapIndex = 1;
        while (
            this.isSmallerThan(
                this.heapList[swapIndex * 2],
                this.heapList[swapIndex],
            ) ||
            this.isSmallerThan(
                this.heapList[swapIndex * 2 + 1],
                this.heapList[swapIndex],
            )
        ) {
            const smallestChildIndex = this.isSmallerThan(
                this.heapList[swapIndex * 2],
                this.heapList[swapIndex * 2 + 1],
            )
                ? swapIndex * 2
                : swapIndex * 2 + 1;

            [this.heapList[swapIndex], this.heapList[smallestChildIndex]] = [
                this.heapList[smallestChildIndex],
                this.heapList[swapIndex],
            ];

            swapIndex = smallestChildIndex;
        }
        return poppedVal;
    }
}
