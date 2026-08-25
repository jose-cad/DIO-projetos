namespace Hotel.Models;

public class Pessoa
{
	public Pessoa()
	{
		Nome = string.Empty;
		Sobrenome = string.Empty;
	}

	public Pessoa(string nome)
	{
		Nome = nome;
		Sobrenome = string.Empty;
	}

	public Pessoa(string nome, string sobrenome)
	{
		Nome = nome;
		Sobrenome = sobrenome;
	}

	public string Nome { get; set; }
	public string Sobrenome { get; set; }
	public string NomeCompleto => $"{Nome} {Sobrenome}".ToUpper();
}