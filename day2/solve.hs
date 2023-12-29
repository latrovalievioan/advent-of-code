import Data.List.Split
import Data.List

type RGB = (Int, Int, Int)

main :: IO ()
main = do
  input <- filter (/= "") . splitOn "\n" <$> readFile "input"

  print(calcSet "3 blue, 4 red")

  print $ calcLine(head input)

  solve input

  where 
    solve :: [String] -> IO()
    solve lines = do 
      let x = foldl' step 0 lines
      print x
      
      where
        step :: Int -> String -> Int
        step acc line
          | r <= 12 && g <= 13 && b <= 14 = acc + id
          | otherwise =  acc
          where
            (id, (r,g,b)) = calcLine line

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



