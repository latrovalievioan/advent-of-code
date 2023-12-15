import System.IO  
import Data.List.Split
import Data.List
import Data.Char (isDigit)
import Data.Text (replace, pack, unpack)

main :: IO ()
main = do
  s <- splitOn "\n" <$> readFile "input"
  let input = init s

  let lines = map getLine input
  let lines2 = map (\x -> getLine (transformLine x 0)) input

  print (solve lines)
  print (solve lines2)


  where
    getLine :: [Char] -> [Char]
    getLine l = [head digits, last digits]
      where digits = filter isDigit l

    solve :: [[Char]] -> Integer
    solve = foldl' (\acc curr -> acc + (read curr::Integer)) 0 

    transformLine :: [Char] -> Int -> [Char]
    transformLine line i 
      | i == 9 = line
      | otherwise = transformLine (unpack (replace replacing with (pack line))) (i + 1)
      where tuples = [("one", "one1one"),
                      ("two", "two2two"), 
                      ("three", "three3three"), 
                      ("four", "four4four"), 
                      ("five", "five5five"), 
                      ("six", "six6six"), 
                      ("seven", "seven7seven"), 
                      ("eight", "eight8eight"), 
                      ("nine", "nine9nine")]
            replacing = pack (fst (tuples !! i))
            with = pack (snd (tuples !! i ))


