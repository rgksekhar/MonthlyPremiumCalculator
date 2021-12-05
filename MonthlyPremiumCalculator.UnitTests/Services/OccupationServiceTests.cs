using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using MonthlyPremiumCalculatorServices.Repository;
using MonthlyPremiumCalculatorServices.Services;
using NSubstitute;
using NUnit.Framework;

namespace MonthlyPremiumCalculator.UnitTests
{
    [TestFixture]
    public class OccupationServiceTests
    {      
        private OccupationService _occupationService;
        private IOccupationRepository _occupationRepository;
        private ILogger<OccupationService> _logger;

        [SetUp]
        public void SetUp()
        {
            _occupationRepository = Substitute.For<IOccupationRepository>();
            _logger = Substitute.For<ILogger<OccupationService>>();
            _occupationService = new OccupationService(_occupationRepository, _logger);
        }

        [Test]
        public async Task GetOccupationList()
        {
            _occupationRepository.GetOccupations().Returns(new List<string>() { "Doctor" });

            var result = await _occupationService.GetOccupations();

            Assert.AreEqual(1, result.Count());
        }
    }
}
