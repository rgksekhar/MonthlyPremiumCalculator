using System.Threading.Tasks;
using MonthlyPremiumCalculatorDtos;
using MonthlyPremiumCalculatorServices.Repository;
using NUnit.Framework;

namespace MonthlyPremiumCalculator.UnitTests
{
    [TestFixture]
    public class CalculatePremiumRepositoryTests
    {      
        private CalculatePremiumRepository _calculatePremiumRepository;

        [SetUp]
        public void SetUp()
        {
            _calculatePremiumRepository = new CalculatePremiumRepository();
        }

        [Test]
        public async Task GetOccupationList()
        {
            var request = new PremiumCalculatorDtos() { SumInsured = 100000, Age = 33 };
            var result = await _calculatePremiumRepository.CalculatePremium(request, 2);

            Assert.AreEqual(79200m, result);
        }
    }
}
