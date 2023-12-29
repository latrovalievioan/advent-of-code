import Data.List.Split
import Data.List

type RGB = (Int, Int, Int)

main :: IO ()
main = do
  input <- filter (/= "") . splitOn "\n" <$> readFile "input"

  print $ solve input

  where 
    solve :: [String] -> (Int, Int)
    solve = foldl' step (0, 0)
      where
        step :: (Int, Int) -> String -> (Int, Int)
        step (idSum, powerSum) line
          | r <= 12 && g <= 13 && b <= 14 = (idSum + id, powerSum + power)
          | otherwise = (idSum, powerSum + power)
          where
            (id, (r,g,b)) = calcLine line
            power = r * g * b

    calcLine :: String -> (Int, RGB)
    calcLine l = (read id :: Int, foldl' step (0, 0 ,0) gameSets)
      where
        [gameId, stringSets] = splitOn ": " l

        [_, id] = splitOn " " gameId

        gameSets = splitOn "; " stringSets

        step :: RGB -> String -> RGB 
        step (aR,aG,aB) gameSet = (
            max aR cR,
            max aG cG,
            max aB cB
          )
          where (cR,cG,cB) = calcSet gameSet

    calcSet :: String -> RGB
    calcSet set = foldl' step (0,0,0) valueColorList
      where 
        valueColorList = splitOn ", " set

        step :: RGB -> String -> RGB
        step (red, green, blue) curr
          | c == "red" = (read v :: Int, green, blue)
          | c == "green" = (red, read v :: Int, blue)
          | otherwise = (red, green, read v :: Int)

          where
            [v, c] = splitOn " " curr



