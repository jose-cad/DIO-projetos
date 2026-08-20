namespace Parking.Models
{
	public class Parking
	{
		private List<Vehicle> vehicles = new List<Vehicle>();

		public void AddVehicle()
		{
			Console.WriteLine("Digite a placa do veículo para estacionar:");
			string licensePlate = Console.ReadLine();

			Console.WriteLine("Digite o preço inicial:");
			decimal initialPrice = Convert.ToDecimal(Console.ReadLine());

			Console.WriteLine("Digite o preço por hora:");
			decimal hourPrice = Convert.ToDecimal(Console.ReadLine());

			if (!string.IsNullOrWhiteSpace(licensePlate))
			{
				Vehicle vehicle = new Vehicle(licensePlate, initialPrice, hourPrice);
				vehicles.Add(vehicle);
				Console.WriteLine("Veículo cadastrado com sucesso!");
			}
		}

		public void RemoveVehicle()
		{
			Console.WriteLine("Digite a placa do veículo para remover:");
			string licensePlate = Console.ReadLine();

			Vehicle vehicle = vehicles.FirstOrDefault(x => x.LicensePlate.Equals(licensePlate, StringComparison.OrdinalIgnoreCase));

			if (vehicle != null)
			{
				Console.WriteLine("Digite a quantidade de horas que o veículo permaneceu estacionado:");
				int hours = Convert.ToInt32(Console.ReadLine());

				decimal totalPrice = vehicle.InitialPrice + (vehicle.HourPrice * hours);
				vehicles.Remove(vehicle);

				Console.WriteLine($"O veículo {vehicle.LicensePlate} foi removido e o preço total foi de: R$ {totalPrice:F2}");
			}
			else
			{
				Console.WriteLine("Desculpe, veículo não localizado.");
			}
		}

		public void ListVehicles()
		{
			if (vehicles.Any())
			{
				Console.WriteLine("Os veículos estacionados são:");
				foreach (Vehicle vehicle in vehicles)
				{
					Console.WriteLine($"- Placa: {vehicle.LicensePlate} | Preço Inicial: R$ {vehicle.InitialPrice:F2} | Preço/Hora: R$ {vehicle.HourPrice:F2}");
				}
			}
			else
			{
				Console.WriteLine("Não há veículos estacionados.");
			}
		}
	}
}