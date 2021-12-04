using MonthlyPremiumCalculatorDtos;
using System.Threading.Tasks;

namespace MonthlyPremiumCalculatorServices.Repository
{
    public interface ICalculatePremiumRepository
    {
        Task<decimal> CalculatePremium(PremiumCalculatorDtos stroccupation, decimal factor);
    }
}
