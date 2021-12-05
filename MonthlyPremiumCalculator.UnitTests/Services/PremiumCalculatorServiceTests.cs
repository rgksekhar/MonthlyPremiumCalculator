using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using MonthlyPremiumCalculatorDtos;
using MonthlyPremiumCalculatorServices.Repository;
using MonthlyPremiumCalculatorServices.Services;
using NSubstitute;
using NUnit.Framework;

namespace MonthlyPremiumCalculator.UnitTests
{
    [TestFixture]
    public class PremiumCalculatorServiceTests
    {      
        private PremiumCalculatorService _premiumCalculatorService;
        private ICalculatePremiumRepository _calculatePremiumRepository;
        private IOccupationRepository _occupationRepository;
        private ILogger<PremiumCalculatorService> _logger;

        [SetUp]
        public void SetUp()
        {
            _occupationRepository = Substitute.For<IOccupationRepository>();
            _calculatePremiumRepository = Substitute.For<ICalculatePremiumRepository>();
            _logger = Substitute.For<ILogger<PremiumCalculatorService>>();
            _premiumCalculatorService = new PremiumCalculatorService(_calculatePremiumRepository, _occupationRepository, _logger);
        }

        [Test]
        public async Task GetOccupationList()
        {
            _occupationRepository.GetOccupations().Returns(new List<string>() { "Doctor" });

            var request = new PremiumCalculatorDtos() { Occupation = "Doctor" };
            _occupationRepository.GetOccupationRatingFactor(request.Occupation).Returns(1.75m);
            _calculatePremiumRepository.CalculatePremium(request, 1.75m).Returns(100);

            var result = await _premiumCalculatorService.CalculatePremium(request);

            Assert.AreEqual(1, result);
        }
    }
}
