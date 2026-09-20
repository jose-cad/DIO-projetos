"""Módulo principal orquestrador das resoluções dos desafios."""

from resolucoes_code import (
    concat_dados,
    media_notas,
    ope_mat,
    par_impar,
    repet_txt,
    verif_palindromo,
)


def main():
    print("=== RESOLUÇÃO DOS ALGORITMOS (DIO + GITHUB COPILOT) ===\n")
    concat_dados.executar()
    repet_txt.executar()
    ope_mat.executar()
    par_impar.executar()
    media_notas.executar()
    verif_palindromo.executar()


if __name__ == "__main__":
    main()
