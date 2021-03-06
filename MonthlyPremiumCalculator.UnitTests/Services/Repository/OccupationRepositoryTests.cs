using System.Linq;
using System.Threading.Tasks;
using MonthlyPremiumCalculatorServices.Repository;
using NUnit.Framework;

namespace MonthlyPremiumCalculator.UnitTests
{
    [TestFixture]
    public class OccupationRepositoryTests
    {      
        private OccupationRepository _occupationRepository;

        [SetUp]
        public void SetUp()
        {
            _occupationRepository = new OccupationRepository();
        }

        [Test]
        public async Task GetOccupationList()
        {
            var result = await _occupationRepository.GetOccupations();

            Assert.AreEqual(7, result.Count());
        }
    }
}
