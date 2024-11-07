using CombinationTestApi.BL;
using CombinationTestApi.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace CombinationTestApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CombinationController : ControllerBase
    {

        CombinationBL bl = new CombinationBL();


        // פונקציה שמחזירה את מספר הקומבנציות
        [HttpGet("StartAPI")]
        public ActionResult<long> StartAPI(int num)
        {
            try
            {
                long factorial = bl.StartAPI(num);
                if (factorial == 0)
                    return Ok(new { message = "אין יותר קומבינציות", lastCombination = true });
                return Ok(new { data = factorial, lastCombination = false });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        //פונקציה שמחזירה את הקומביציחה הבאה לפי הקודמת
        [HttpPost("GetNextCombination")]
        public ActionResult<object> GetNextCombination(CombinationInfo combinationInfo)
        {
            List<int> combination;
            try
            {

                combination = bl.GetCombinationByPrev(combinationInfo.num, combinationInfo.prevCombination);
                if (combination == null)
                    return Ok(new { message = "אין יותר קומבינציות", lastCombination = true });
                return Ok(new { data = combination, lastCombination = false });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("GetNumPrevCombination")]
        public ActionResult<object> GetNumPrevCombination(CombinationInfo combinationInfo)
        {
            List<List<int>> combination;
            try
            {
                combination = bl.GetAllCombinationByNext(combinationInfo.numCombinations, combinationInfo.prevCombination);
                if (combination == null)
                    return Ok(new { message = "אין יותר קומבינציות", lastCombination = true });
                return Ok(new { data = combination, lastCombination = false });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("GetAllCombination")]
        public ActionResult<List<List<int>>> GetAllCombination(CombinationInfo combinationInfo)
        {
            List<List<int>> combinations = new List<List<int>>();
            try
            {
                combinations = bl.GetAllCombination(combinationInfo);
                if (combinations == null)
                    return Ok(new { message = "אין יותר קומבינציות", lastCombination = true });
                return Ok(new { data = combinations, lastCombination = false });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("GetCombinationSpecifiPage")]
        public ActionResult<List<List<int>>> GetCombinationSpecifiPage(PageCombinationInfo pageCombinationInfo)
        {
            try
            {
                List<List<int>> combinationSpecificPage = new List<List<int>>();
                combinationSpecificPage = bl.GetCombinationSpecificPage(pageCombinationInfo);
                return Ok(new { data = combinationSpecificPage });
            }

            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
