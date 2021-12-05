using System.Collections.Generic;
using System.Threading.Tasks;

namespace MonthlyPremiumCalculatorServices.Repository
{
    public interface IOccupationRepository
    {
        Task<IEnumerable<string>> GetOccupations();
        Task<decimal> GetOccupationRatingFactor(string occupation);
    }
}
