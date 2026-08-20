namespace Parking.Models
{
	public class Vehicle
	{
		public string LicensePlate { get; set; }
		public decimal InitialPrice { get; set; }
		public decimal HourPrice { get; set; }

		public Vehicle(string licensePlate, decimal initialPrice, decimal hourPrice)
		{
			LicensePlate = licensePlate;
			InitialPrice = initialPrice;
			HourPrice = hourPrice;
		}
	}
}