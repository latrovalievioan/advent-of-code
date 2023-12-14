import System.IO  
import Data.List.Split
import Data.List
import Data.Char (isDigit)

main :: IO ()
main = do
  s <- splitOn "\n" <$> readFile "input"
  let input = init s

  let lines = map getLine input

  print (solve lines)

  where
    getLine :: [Char] -> [Char]
    getLine l = [head digits, last digits]
      where digits = filter isDigit l

    solve :: [[Char]] -> Integer
    solve = foldl' (\acc curr -> acc + (read curr::Integer)) 0 
