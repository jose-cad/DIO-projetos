namespace Cellphone.Models;

public abstract class Smartphone
{
	public string Number { get; set; }
	public string Model { get; }
	public string IMEI { get; }
	public int Memory { get; }

	public Smartphone(string number, string model, string imei, int memory)
	{
		Number = number;
		Model = model;
		IMEI = imei;
		Memory = memory;
	}

	public void Call()
	{
		Console.WriteLine("Ligando...");
	}

	public void AnswerCall()
	{
		Console.WriteLine("Recebendo ligação...");
	}

	public abstract void InstallApp(string nameApp);
}
