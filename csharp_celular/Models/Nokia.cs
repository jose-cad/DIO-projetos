namespace Cellphone.Models;

public class Nokia : Smartphone
{
	public Nokia(string number, string model, string imei, int memory)
		: base(number, model, imei, memory) {}

	public override void InstallApp(string nameApp)
	{
		Console.WriteLine($"Instalando o aplicativo \"{nameApp}\" no Nokia via Play Store...");
	}
}
