using MonthlyPremiumCalculatorDtos;
using System.Threading.Tasks;

namespace MonthlyPremiumCalculatorServices.Services
{
   public interface IPremiumCalculatorService
    {      
        Task<decimal> CalculatePremium(PremiumCalculatorDtos premiumCalculatorDtos);
    }
}
