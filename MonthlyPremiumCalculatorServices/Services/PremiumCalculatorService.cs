using Microsoft.Extensions.Logging;
using MonthlyPremiumCalculatorDtos;
using MonthlyPremiumCalculatorServices.Repository;
using System.Threading.Tasks;

namespace MonthlyPremiumCalculatorServices.Services
{
    public class PremiumCalculatorService : IPremiumCalculatorService
    {
        private readonly ILogger<OccupationService> _logger;
        private readonly ICalculatePremiumRepository _calculatePremiumRepository;
        private readonly IOccupationRepository _occupationRepository;

        public PremiumCalculatorService(ICalculatePremiumRepository calculatePremiumRepository, IOccupationRepository occupationRepository, ILogger<OccupationService> logger)
        {
            _logger = logger;
            _calculatePremiumRepository = calculatePremiumRepository;
            _occupationRepository = occupationRepository;
        }

        public async Task<decimal> CalculatePremium(PremiumCalculatorDtos premiumCalculator)
        {
            var factor = await _occupationRepository.GetOccupationRatingFactor(premiumCalculator.Occupation);

            return await _calculatePremiumRepository.CalculatePremium(premiumCalculator, factor);
        }
    }
}
