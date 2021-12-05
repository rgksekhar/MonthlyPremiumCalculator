using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using MonthlyPremiumCalculator.Controllers;
using MonthlyPremiumCalculatorServices.Services;
using NSubstitute;
using NUnit.Framework;

namespace MonthlyPremiumCalculator.UnitTests
{

    [TestFixture]
    public class OccupationControllerTests
    {
        private IOccupationService _occupationService;        
        private OccupationController _occupationController;
        private ILogger<OccupationController> _logger;

        [SetUp]
        public void SetUp()
        {
            _occupationService = Substitute.For<IOccupationService>();
            _logger = Substitute.For<ILogger<OccupationController>>();

            _occupationController = new OccupationController(_occupationService, _logger);
        }

        [Test]
        public async Task GetOccupationList()
        {
            _occupationService.GetOccupations().Returns(new List<string>() { "Doctor" });

            var result = (OkObjectResult)await _occupationController.GetOccupationList();

            Assert.AreEqual(200, result.StatusCode);
        }
    }
}
