defmodule Utils do
  def parse_input(path) do
    File.read!(path)
    |> String.trim()
    |> String.split("\n")
    |> Enum.map(fn line ->
      line
      |> String.replace("Card ", "")
      |> String.trim()
      |> String.split(~r/(:\s+| \| )/)
    end)
    |> Enum.map(fn [idString, winningString, currentString] ->
      %{
        "id" => String.to_integer(idString),
        "winning" => winningString |> transformStringNums(),
        "own" => currentString |> transformStringNums()
      }
    end)
  end

  def transformStringNums(s) do
    s
    |> String.trim()
    |> String.split(~r/\s+/)
    |> Enum.map(fn x ->
      String.to_integer(x)
    end)
  end
end

defmodule Solve do
  @file_path "./input"

  def part_1 do
    @file_path
    |> Utils.parse_input()
    |> Enum.reduce(0, fn m, acc ->
      acc +
        (m["own"]
         |> Enum.reduce(0, fn n, acc ->
           if Enum.member?(m["winning"], n) do
             if acc === 0 do
               1
             else
               acc * 2
             end
           else
             acc
           end
         end))
    end)
  end
end

Solve.part_1() |> dbg
