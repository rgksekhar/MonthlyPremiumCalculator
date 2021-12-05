using Microsoft.Extensions.Logging;
using MonthlyPremiumCalculatorServices.Repository;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace MonthlyPremiumCalculatorServices.Services
{
    public class OccupationService : IOccupationService
    {
        private readonly ILogger<OccupationService> _logger;
        private readonly IOccupationRepository _occupationRepository;

        public OccupationService(IOccupationRepository occupationRepository, ILogger<OccupationService> logger)
        {
            _logger = logger;
            _occupationRepository = occupationRepository;
        }
        public async Task<IEnumerable<string>> GetOccupations()
        {
            return await _occupationRepository.GetOccupations();
        }

        public async Task<decimal> GetOccupationRatingFactor(string strOccupation)
        {
            return await _occupationRepository.GetOccupationRatingFactor(strOccupation);
        }
    }
}

