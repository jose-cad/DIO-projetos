using Cellphone.Models;

public class Program
{
	public static void Main()
	{
		Console.WriteLine("--- Teste Nokia ---");
		Smartphone nokia = new Nokia(number: "123456", model: "Tijolão 3310", imei: "111111111", memory: 64);
		nokia.Call();
		nokia.InstallApp("WhatsApp");

		Console.WriteLine("\n--- Teste iPhone ---");
		Smartphone iphone = new Iphone(number: "654321", model: "iPhone 15", imei: "222222222", memory: 128);
		iphone.AnswerCall();
		iphone.InstallApp("Telegram");
	}
}
