using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MonthlyPremiumCalculatorServices.Repository
{
    public class OccupationRepository : IOccupationRepository
    {
        public readonly Dictionary<string, decimal> OccupationRatingFactor = new Dictionary<string, decimal> 
        { 
            { "Professional", 1.0m}, {"White Collar", 1.25m }, {"Light Manual", 1.5m }, {"Heavy Manual", 1.75m }
        };

        public readonly Dictionary<string, string> Occupations = new Dictionary<string, string>
        {
            { "Select", "Select" }, {"Cleaner", "Light Manual" }, {"Doctor","Professional" }, {"Author", "White Collar"},
            { "Farmer", "Heavy Manual" }, {"Mechanic", "Heavy Manual" }, {"Florist", "Light Manual" }
        };

        public async Task<IEnumerable<string>> GetOccupations()
        {
            return Occupations.Keys.ToList();
        }

        public async Task<decimal> GetOccupationRatingFactor(string occupation)
        {
            var occupationRatingFactor = decimal.Zero;
            if (Occupations.ContainsKey(occupation))
            {
                var occRating = Occupations[occupation];
                if (!string.IsNullOrEmpty(occRating)) 
                { 
                    occupationRatingFactor = OccupationRatingFactor[occRating];
                }
            }

            return occupationRatingFactor;
        }
    }
}
