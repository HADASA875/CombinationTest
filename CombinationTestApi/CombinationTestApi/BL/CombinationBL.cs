using CombinationTestApi.Models;
using System.Linq;

namespace CombinationTestApi.BL
{
    public class CombinationBL
    {
        public List<int> GetCombinationByPrev(int num, List<int> prevCombination)
        {
            // אם זו הפעם הראשונה, יוצרים רשימה של המספרים מ-1 עד n ומחזירים אותה
            if (prevCombination.Count == 0)
            {
                return Enumerable.Range(1, num).ToList();
            }
            int n = prevCombination.Count;
            // מוצאים את נקודת העלייה האחרונה מצד ימין שבה יש לנו מעבר ממספר גדול למספר קטן
            int i = n - 2;
            while (i >= 0 && prevCombination[i] >= prevCombination[i + 1])
            {
                i--;
            }
            // אם לא נמצאה נקודת עלייה, הקומבינציה הנוכחית היא האחרונה 
            if (i < 0)
            {
                return null;
            }
            // מחפשים את המספר הקטן ביותר מצד ימין שהוא גדול יותר מהמספר בנקודת העלייה
            int j = n - 1;
            while (prevCombination[j] <= prevCombination[i])
            {
                j--;
            }
            // מבצעים החלפה בין נקודת העלייה והמספר שמצאנו
            Swap(prevCombination, i, j);
            // הופכים את כל המספרים שמימין לנקודת העלייה כדי לקבל את הסדר הקטן ביותר
            Reverse(prevCombination, i + 1, n - 1);
            return prevCombination;
        }

        public List<List<int>> GetAllCombinationByNext(int numCombination, List<int> nextCombination)
        {
            List<List<int>> combinations = new List<List<int>>();
            List<int> prevCombination = GetCombinationByNext(nextCombination);
            combinations.Add(prevCombination);
            for (int k = 1; k < numCombination; k++)
            {
                prevCombination = GetCombinationByNext(combinations.Last().ToList());
                // אם אין יותר קומבינציה אפשריות, יציאה מהלולאה
                if (prevCombination == null)
                    break;
                combinations.Add(prevCombination);
            }
            combinations.Reverse();
            return combinations;
        }

        // פונקציה שמחזירה את הקומבינציה הקודמת לפי הקומביציה הבאה 
        private List<int> GetCombinationByNext(List<int> prevCombination)
        {
            int n = prevCombination.Count;
            int i = n - 2;
            while (i >= 0 && prevCombination[i] <= prevCombination[i + 1])
            {
                i--;
            }
            if (i < 0)
            {
                return null;
            }
            int j = n - 1;
            while (prevCombination[j] >= prevCombination[i])
            {
                j--;
            }
            Swap(prevCombination, i, j);
            Reverse(prevCombination, i + 1, n - 1);
            return prevCombination;
        }


        public List<List<int>> GetAllCombination(CombinationInfo combinationInfo)
        {
            List<List<int>> combinations = new List<List<int>>();
            //if (combinationInfo.numCombinations == 0)
            //    return combinations;
            List<int> nextCombination = GetCombinationByPrev(combinationInfo.num, combinationInfo.prevCombination);
            if (nextCombination == null)
                return null;
            combinations.Add(nextCombination);
            for (int i = 1; i < combinationInfo.numCombinations; i++)
            {
                nextCombination = GetCombinationByPrev(combinationInfo.num, combinations.Last().ToList());
                if (nextCombination == null)
                    break;
                combinations.Add(nextCombination);
            }
            return combinations;
        }


        // פונקציה שמחזירה קומבינציות לפי מספר עמוד שהתבקש
        public List<List<int>> GetCombinationSpecificPage(PageCombinationInfo pageCombinationInfo)
        {
            List<List<int>> combinationSpecificPage = new List<List<int>>();
            List<int> listToAdd = new List<int> ();
            long indexCombination = pageCombinationInfo.pageNumber * (pageCombinationInfo.pageSize);
            List<int> numbers = new List<int>();
            for (int i = 1; i <= pageCombinationInfo.number; i++)
            {
                numbers.Add(i);
            }

            for (int i = pageCombinationInfo.number; i > 0; i--)
            {
                if (i == 1)
                {
                    listToAdd.Add(numbers[0]);
                    break;
                }
                long factorial = StartAPI(i - 1);
                long index = indexCombination / factorial;
                listToAdd.Add(numbers[int.Parse(index.ToString())]);
                numbers.RemoveAt(int.Parse(index.ToString()));
                indexCombination %= factorial;
            }
            combinationSpecificPage.Add(listToAdd);
            for (int i = 1;i < pageCombinationInfo.pageSize; i++)
            {
                listToAdd = GetCombinationByPrev(pageCombinationInfo.number, listToAdd.ToList());
                if (listToAdd == null)
                    break;
                combinationSpecificPage.Add(listToAdd);
            }
            return combinationSpecificPage;
        }


        // פונקציה שעושה החלפה בין שני איברים במערך
        private void Swap(List<int> arr, int i, int j)
        {
            int temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
        }

        // פונקציה שמבצעת היפוך של סדר המספרים במערך בין שני אינדקסים מסוימים
        private void Reverse(List<int> arr, int start, int end)
        {
            while (start < end)
            {
                Swap(arr, start, end);
                start++;
                end--;
            }
        }


        public long StartAPI(int n)
        {
            // n! זה n מספר הקומבינציות של 
            if (n == 1) return 1;
            if (n == 0) return 0;
            return n * StartAPI(n - 1);
        }

    }
}
