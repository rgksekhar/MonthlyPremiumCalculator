using MonthlyPremiumCalculatorDtos;
using System.Threading.Tasks;

namespace MonthlyPremiumCalculatorServices.Repository
{
    public class CalculatePremiumRepository : ICalculatePremiumRepository
    {
        public async Task<decimal> CalculatePremium(PremiumCalculatorDtos premiumCalculator, decimal factor)
        {
            return premiumCalculator.SumInsured * factor * premiumCalculator.Age / 1000 * 12;
        }
    }
}
