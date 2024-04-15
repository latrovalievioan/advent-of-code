defmodule Utils do
  def input_to_map(file_path) do
    File.read!(file_path)
    |> String.trim()
    |> String.split("\n")
    |> Enum.with_index()
    |> Enum.reduce(%{}, fn {row_value, row_index}, acc_map ->
      row_value
      |> String.graphemes()
      |> Enum.with_index()
      |> Enum.reduce(acc_map, fn {col_value, col_index}, inner_acc_map ->
        if col_value !== "." do
          inner_acc_map
          |> Map.put({row_index, col_index}, col_value)
        else
          inner_acc_map
        end
      end)
    end)

    # |> dbg
  end

  def is_symbol(ch) do
    case Integer.parse(ch) do
      :error -> true
      _ -> false
    end
  end

  def symbols_from_map(map) do
    map
    |> Map.filter(fn {_, v} ->
      is_symbol(v)
    end)
  end

  def neighbour_deltas do
    [[{-1, -1}, {-1, 0}, {-1, 1}], [{0, -1}], [{0, 1}], [{1, -1}, {1, 0}, {1, 1}]]
  end

  def walk_left(acc, {r, c}, map) do
    val = Map.get(map, {r, c}, "")

    if is_symbol(val) do
      acc
    else
      walk_left(val <> acc, {r, c - 1}, map)
    end
  end

  def walk_right(acc, {r, c}, map) do
    val = Map.get(map, {r, c}, "")

    if is_symbol(val) do
      acc
    else
      walk_right(acc <> val, {r, c + 1}, map)
    end
  end

  def string_from_delta({d_r, d_c}, {r, c}, map) do
    initial = Map.get(map, {r + d_r, c + d_c}, "")

    if is_symbol(initial) do
      ""
    else
      left = walk_left("", {r + d_r, c + d_c - 1}, map)

      right = walk_right("", {r + d_r, c + d_c + 1}, map)

      left <> initial <> right
    end
  end

  def calc_direction(direction, start, map) do
    direction
    |> Enum.map(fn delta ->
      delta
      |> string_from_delta(start, map)
    end)
    |> Enum.filter(fn x -> x !== "" end)
    |> MapSet.new()
    |> Enum.reduce(0, fn curr, acc ->
      String.to_integer(curr) + acc
    end)
  end

  def is_gear_symbol(ch) do
    ch === "*"
  end

  def gear_symbols_from_map(map) do
    map
    |> Map.filter(fn {_, v} ->
      is_gear_symbol(v)
    end)
  end

  def gear_neighbours(vec, map) do
    neighbour_deltas()
    |> Enum.map(fn dir ->
      dir
      |> Enum.map(fn delta ->
        delta
        |> string_from_delta(vec, map)
      end)
      |> Enum.filter(fn x -> x !== "" end)
      |> Enum.map(fn x ->
        String.to_integer(x)
      end)
      |> MapSet.new()
      |> MapSet.to_list()
    end)
    |> Enum.flat_map(fn x -> x end)
  end
end

defmodule Solve do
  @file_path "./input"

  def part_1 do
    input_map = Utils.input_to_map(@file_path)

    input_map
    |> Utils.symbols_from_map()
    |> Enum.reduce(0, fn {key, _}, acc ->
      acc +
        (Utils.neighbour_deltas()
         |> Enum.reduce(0, fn dir, acc ->
           acc + (dir |> Utils.calc_direction(key, input_map))
         end))
    end)
  end

  def part_2 do
    input_map = Utils.input_to_map(@file_path)

    input_map
    |> Utils.gear_symbols_from_map()
    |> Enum.map(fn {vec, _} ->
      vec
      |> Utils.gear_neighbours(input_map)
    end)
    |> Enum.filter(fn x -> Enum.count(x) === 2 end)
    |> Enum.reduce(0, fn curr, acc ->
      acc + (curr |> Enum.reduce(1, fn num, acc2 -> num * acc2 end))
    end)
  end
end

Solve.part_1() |> dbg
Solve.part_2() |> dbg
