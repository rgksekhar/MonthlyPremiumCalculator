using System;

namespace MonthlyPremiumCalculatorDtos
{
    public class PremiumCalculatorDtos
    {
        public string InsuredNames { get; set; }
        public int Age { get; set; }
        public DateTime DOB { get; set; }
        public int SumInsured { get; set; }
        public string Occupation { get; set; }
        public decimal PremiumAmount { get; set; }
    }
}
