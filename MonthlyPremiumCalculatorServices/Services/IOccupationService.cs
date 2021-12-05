using System.Collections.Generic;
using System.Threading.Tasks;

namespace MonthlyPremiumCalculatorServices.Services
{
    public interface IOccupationService
    {
        Task<IEnumerable<string>> GetOccupations();
        Task<decimal> GetOccupationRatingFactor(string strOccupation);
    }
}
