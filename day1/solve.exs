defmodule Utils do
  def concat_first_last(s) do
    String.first(s) <> String.last(s)
  end
end

defmodule Part1 do
  def solve(path) do
    File.stream!(path)
    |> Enum.map(fn l ->
      l
      |> String.replace(~r/[a-zA-Z]/, "")
      |> String.replace(~r/\n/, "")
      |> Utils.concat_first_last()
      |> String.to_integer()
    end)
    |> Enum.sum()
  end
end

defmodule Part2 do
  def solve(path) do
    File.stream!(path)
    |> Enum.map(fn l ->
      l
      |> String.replace("one", "one1one")
      |> String.replace("two", "two2two")
      |> String.replace("three", "three3three")
      |> String.replace("four", "four4four")
      |> String.replace("five", "five5five")
      |> String.replace("six", "six6six")
      |> String.replace("seven", "seven7seven")
      |> String.replace("eight", "eight8eight")
      |> String.replace("nine", "nine9nine")
      |> String.replace(~r/[a-zA-Z]/, "")
      |> String.replace(~r/\n/, "")
      |> Utils.concat_first_last()
      |> String.to_integer()
    end)
    |> Enum.sum()
  end
end

IO.puts(Part1.solve("./input"))
IO.puts(Part2.solve("./input"))
