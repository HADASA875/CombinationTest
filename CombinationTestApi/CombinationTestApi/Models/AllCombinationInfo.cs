namespace CombinationTestApi.Models
{
    public class CombinationInfo
    {
        public int num { get; set; }
        public int numCombinations { get; set; }
        public List<int>? prevCombination { get; set; }
    }

    public class PageCombinationInfo
    {
        public int number { get; set; }
        public long pageNumber { get; set; }
        public int pageSize { get; set; }
    }
}
