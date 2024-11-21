## Exercício: Sistema de gerenciamento de transportadora

implemente um programa que simule a gestão de uma transportadora, incluindo o cadastro de caminhões, motoristas e encomendas.
---

# Requisitos:
 **1. Cadastro de caminhões:**
    - Cada caminhão deve ter um **ID**, **Modelo**, e **capacidade de carga (em toneladas).**
     
 **2. Cadastro de motoristas:**
    - Cada motorista deve ter um **ID**, **Nome**, e o **caminhão atribuido(pelo ID do caminhão).**
 
 **3. Registro de encomendas:**
    - Cada encomenda deve ter um **ID**, **Peso**, e ser **atribuida a um caminhão (com verificação de capacidade).**
 
 **4. Funcionalidades do programa:**
    - Adicionar um novo Caminhão.
    - Adicionar um novo Motorista.
    - Adicionar uma encomenda e atribuí-la a um caminhão disponível.
    - Listar todos os caminhões cadastrados.
    - Listar todos os motoristas e os caminhões que estão dirigindo.
    - listar todas as encomendas e os caminhões que as estão transportando.

 **5. Validações:**
    - Não permitir que um caminhão transporte mais que o peso do que sua capacidade.
    - Não permitir que um motorista seja atribuído a mais de um caminhão ao mesmo tempo.
