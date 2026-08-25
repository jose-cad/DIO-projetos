namespace Parking;

public class Program
{
	public static void Main()
	{
		Console.OutputEncoding = System.Text.Encoding.UTF8;

		Parking.Models.Parking parking = new Parking.Models.Parking();

		bool showMenu = true;

		while (showMenu)
		{
			Console.Clear();
			Console.WriteLine("Digite a sua opção:");
			Console.WriteLine("1 - Cadastrar veículo");
			Console.WriteLine("2 - Remover veículo");
			Console.WriteLine("3 - Listar veículos");
			Console.WriteLine("4 - Encerrar");

			switch (Console.ReadLine())
			{
				case "1":
					parking.AddVehicle();
					break;
				case "2":
					parking.RemoveVehicle();
					break;
				case "3":
					parking.ListVehicles();
					break;
				case "4":
					showMenu = false;
					break;
				default:
					Console.WriteLine("Opção inválida");
					break;
			}

			Console.WriteLine("Pressione uma tecla para continuar");
			Console.ReadLine();
		}

		Console.WriteLine("O programa se encerrou");
	}
}
