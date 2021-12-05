using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using MonthlyPremiumCalculatorDtos;
using MonthlyPremiumCalculatorServices.Services;
using System.ComponentModel.DataAnnotations;
using System.Threading.Tasks;

namespace MonthlyPremiumCalculator.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PremiumCalculatorController : ControllerBase
    {
        private readonly ILogger<PremiumCalculatorController> _logger;
        private readonly IPremiumCalculatorService _premiumCalculatorService;

        public PremiumCalculatorController(IPremiumCalculatorService premiumCalculatorService, ILogger<PremiumCalculatorController> logger)
        {
            _logger = logger;
            _premiumCalculatorService = premiumCalculatorService;
        }

        [HttpPost]
        public async Task<IActionResult> CalculatePremium([FromBody][Required] PremiumCalculatorDtos request)
        {
            return Ok(await _premiumCalculatorService.CalculatePremium(request));               
        }
    }
}
