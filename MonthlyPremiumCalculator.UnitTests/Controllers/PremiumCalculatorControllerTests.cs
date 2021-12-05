using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using MonthlyPremiumCalculator.Controllers;
using MonthlyPremiumCalculatorDtos;
using MonthlyPremiumCalculatorServices.Services;
using NSubstitute;
using NUnit.Framework;

namespace MonthlyPremiumCalculator.UnitTests
{
    [TestFixture]
    public class PremiumCalculatorControllerTests
    {
        private IPremiumCalculatorService _premiumCalculatorService;
        private PremiumCalculatorController _premiumCalculatorController;
        private ILogger<PremiumCalculatorController> _logger;

        [SetUp]
        public void SetUp()
        {
            _premiumCalculatorService = Substitute.For<IPremiumCalculatorService>();
            _logger = Substitute.For<ILogger<PremiumCalculatorController>>();

            _premiumCalculatorController = new PremiumCalculatorController(_premiumCalculatorService, _logger);
        }

        [Test]
        public async Task GetOccupationList()
        {
            var request = new PremiumCalculatorDtos();
            _premiumCalculatorService.CalculatePremium(request).Returns(100);

            var result = (OkObjectResult)await _premiumCalculatorController.CalculatePremium(request);

            Assert.AreEqual(200, result.StatusCode);
            Assert.AreEqual(100, result.Value);
        }
    }
}
