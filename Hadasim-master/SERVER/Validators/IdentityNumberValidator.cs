using System.ComponentModel.DataAnnotations;

namespace SERVER.Validators
{
  public class IdentityNumberAttribute : ValidationAttribute
  {
    protected override ValidationResult IsValid(object value, ValidationContext validationContext)
    {
      if (value == null)
      {
        return new ValidationResult("Identity number is required.");
      }

      string idNumber = value.ToString();

      // Check length
      if (idNumber.Length != 9)
      {
        return new ValidationResult("Israeli identity number must be 9 characters long.");
      }

      int[] digits = new int[idNumber.Length];

      for (int i = 0; i < idNumber.Length; i++)
      {
        digits[i] = int.Parse(idNumber[i].ToString());
      }

      // Calculate checksum digit
      int checksum = 0;
      for (int i = 0; i < digits.Length - 1; i++)
      {
        int digit = digits[i];
        checksum += (i % 2 == 0) ? digit : digit * 2;
      }

      checksum = (10 - (checksum % 10)) % 10;

      // Validate checksum
      if (checksum != digits[8])
      {
        return new ValidationResult("Invalid Israeli identity number (checksum mismatch).");
      }

      return ValidationResult.Success;
    }

  }
}