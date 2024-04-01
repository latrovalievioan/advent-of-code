defmodule Part1 do
  def concat_first_last(s) do
    String.first(s) <> String.last(s)
  end

  def solve(path) do
    File.stream!(path)
    |> Enum.map(fn l ->
      l
      |> String.replace(~r/[a-zA-Z]/, "")
      |> String.replace(~r/\n/, "")
      |> concat_first_last()
      |> String.to_integer()
    end)
    |> Enum.sum()
  end
end

IO.puts(Part1.solve("./input"))
