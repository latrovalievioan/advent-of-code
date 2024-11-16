defmodule Utils do
  def parse_input(path) do
    File.stream!(path)
    |> Enum.map(fn input ->
      input
      |> parse_line()
    end)
  end

  defp parse_line(l) do
    l
    |> String.replace(~r/Game \d+: /, "")
    |> String.replace("\n", "")
    |> String.split("; ")
    |> Enum.reduce(%{"red" => 0, "blue" => 0, "green" => 0}, fn s, acc ->
      s
      |> parse_set()
      |> Enum.reduce(acc, fn [num, color], acc ->
        if acc[color] < num do
          Map.replace(acc, color, num)
        else
          acc
        end
      end)
    end)
  end

  defp parse_set(set) do
    set
    |> String.split(", ")
    |> Enum.map(fn num_color ->
      num_color
      |> parse_num_color()
    end)
  end

  defp parse_num_color(string) do
    [num, color] = String.split(string, " ")

    [String.to_integer(num), color]
  end
end

defmodule Solve do
  @maxes %{"red" => 12, "green" => 13, "blue" => 14}

  def part_1(path) do
    Utils.parse_input(path)
    |> Enum.with_index()
    |> Enum.reduce(0, fn {map, i}, acc ->
      if map["red"] <= @maxes["red"] && map["green"] <= @maxes["green"] &&
           map["blue"] <= @maxes["blue"] do
        acc + i + 1
      else
        acc
      end
    end)
  end

  def part_2(path) do
    Utils.parse_input(path)
    |> Enum.reduce(0, fn %{"red" => red, "green" => green, "blue" => blue}, acc ->
      acc + red * green * blue
    end)
  end
end

IO.puts(Solve.part_1("./input"))
IO.puts(Solve.part_2("./input"))
