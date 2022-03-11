#include<iostream>
#include<fstream>
#include <string.h>

using namespace std;

struct Pessoa
{
    string nome;
    struct Pessoa *proxima;
};

struct Pessoa *Criarlista(struct Pessoa *atual, string nomedapessoa)
{
    if (atual != NULL)
        return atual;


    struct Pessoa *temp = new Pessoa;


    temp -> nome = nomedapessoa;
    atual = temp;

    atual->proxima = atual;

    return atual;
}

struct Pessoa *Inserirnalista(struct Pessoa *atual, string nomepessoa,bool& teste)
{
    if (atual == NULL) {
        teste=true;
        return Criarlista(atual, nomepessoa);
    }
    else{
        struct Pessoa *pessoa2;
        pessoa2=atual->proxima;
        do
        {
            if (pessoa2->nome == nomepessoa)
            {
                teste=false;
                return pessoa2;
            }
            pessoa2 = pessoa2 -> proxima;
        } while(pessoa2 != atual -> proxima);

        struct Pessoa *auxiliar = new Pessoa;


        auxiliar -> nome = nomepessoa;
        auxiliar -> proxima = atual -> proxima;
        atual -> proxima = auxiliar;
        atual=auxiliar;

        teste=true;
        return atual;
    }}
void Mostrarlista(string nomepessoa, struct Pessoa *atual,bool& teste) {
    struct Pessoa *p;


    if (atual == NULL) {
        teste=false;
        return;
    }
    p = atual -> proxima;

    do {
        if(p->nome==nomepessoa){
            teste=true;
            return;
        }
        p=p->proxima;
    } while(p != atual->proxima);
    teste=false;
}


void Deletarpessoa(Pessoa** removida, string nome,bool& teste)
{

    if (*removida == NULL)
        return;

    if((*removida)->nome == nome && (*removida)->proxima == *removida) {
        free(*removida);
        *removida=NULL;
        teste=true;
    }
    Pessoa *auxiliar=*removida,*d;


    if((*removida)->nome == nome) {
        while(auxiliar->proxima != *removida)
            auxiliar=auxiliar->proxima;
        auxiliar->proxima=(*removida)->proxima;
        free(*removida);
        *removida=auxiliar->proxima;
        teste=true;
    }


    while(auxiliar->proxima != *removida && auxiliar->proxima->nome != nome) {
        auxiliar=auxiliar->proxima;
    }

    if(auxiliar->proxima->nome == nome) {
        d=auxiliar->proxima;
        auxiliar->proxima=d->proxima;
        free(d);
        teste=true;

    }
    else
        teste=false;
}


int main(int argc, char* argv[]) {

    struct Pessoa *atual = NULL;

    bool teste = false;
    ifstream entrada(argv[1]);
    ofstream saida(argv[2]);
    string palavra, palavra2;
    while (!entrada.eof()) {
        getline(entrada, palavra);
        palavra2 = palavra.substr(palavra.find_first_of(" \t") + 1);
        palavra = palavra.substr(0, palavra.find_first_of(" ", 0));

        char aux[palavra2.length() + 1];

        strcpy(aux, palavra2.c_str());
        if (palavra == "ADD") {

            atual = Inserirnalista(atual, palavra2, teste);
            if (teste == true) {
                saida << "[ OK  ] ADD " << palavra2 << endl;
            } else {
                saida << "[ERROR] ADD " << palavra2 << endl;
            }
        } else if (palavra == "SHOW") {
            Mostrarlista(palavra2, atual, teste);
            if (teste == true) {
                string auxiliar1;
                string auxiliar2;
                
          
                do{

                    if(atual->proxima->nome==palavra2){
                        auxiliar1=atual->nome;
                    }
                    atual=atual->proxima;
                }while(atual->nome!=palavra2);

                auxiliar2=atual->proxima->nome;
                saida << "[ OK  ] " << auxiliar1 << "<-" << atual->nome << "->" << auxiliar2 << endl;
            } else {
                saida << "[ERROR] ?<-" << palavra2 << "->?" << endl;
            }
        }
        else if (palavra == "REMOVE") {
            Deletarpessoa(&atual, palavra2,teste);
            if (teste == true) {
                saida << "[ OK  ] REMOVE " << palavra2 << endl;
            } else {
                saida << "[ERROR] REMOVE " << palavra2 << endl;
            }
        }

    }

    entrada.close();
    saida.close();
}


