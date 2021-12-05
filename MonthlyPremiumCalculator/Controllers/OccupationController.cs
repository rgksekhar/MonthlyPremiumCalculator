using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using MonthlyPremiumCalculatorServices.Services;
using System.Threading.Tasks;

namespace MonthlyPremiumCalculator.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OccupationController : ControllerBase
    {
        private readonly IOccupationService _occupationService;
        private readonly ILogger<OccupationController> _logger;

        public OccupationController(IOccupationService occupationService, ILogger<OccupationController> logger)
        {
            _occupationService = occupationService;
            _logger = logger;
        }

        [HttpGet]
        public async Task<IActionResult> GetOccupationList()
        {
            return Ok(await _occupationService.GetOccupations());
        }
    }
}
