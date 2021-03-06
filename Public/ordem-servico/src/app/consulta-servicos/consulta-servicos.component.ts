import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-consulta-servicos',
  templateUrl: './consulta-servicos.component.html',
  styleUrls: ['./consulta-servicos.component.css', '../app.component.css']
})
export class ConsultaServicosComponent implements OnInit {

  constructor() {  }
  servicos = [];
  responsaveis = [];
  ngOnInit(): void {
    fetch("http://localhost:8080/api/responsaveis",{
      headers: {'Content-type': 'application/json'}
    })
    .then((response)=>{
      return response.text();
    }).then((text)=>{
      let responsaveis = JSON.parse(text);
      responsaveis.forEach(responsavel => {
        this.responsaveis.push(responsavel);
      });
    }).catch((e)=>{
      console.log("Erro ao conectar com API. \n" + e);
    })
    fetch("http://localhost:8080/api/servicos")
    .then((response)=>{
      return response.text();
    }).then((text)=>{
      let servicos = JSON.parse(text);
      servicos.forEach(servico => {
          this.servicos.push(servico);
      });
    }).catch((e)=>{
      console.log("Erro ao se conectar com a API. \n" + e);
    })
  }

  retonarStatus(status){
    if(status == "1"){
      return "Em Aberto";
    }
    if(status == "2"){
      return "Finalizado";
    }

    if(status == "3"){
      return "Entregue";
    }

    return "Cancelado";
  }

  filtrar(){
    let responsavel = (document.querySelector("#responsavel") as HTMLInputElement).value;
    let status = (document.querySelector("#status") as HTMLInputElement).value;
    let url = "";
    if(status == "#" && responsavel == "#"){
      url = "http://localhost:8080/api/servicos";
    }else if(responsavel == "#" && status != "#"){
      url = "http://localhost:8080/api/servicos/status/"+status;
    }else if(status == "#" && responsavel != "#"){
      url = "http://localhost:8080/api/servicos/responsavel/"+responsavel;
    }else{
      url = "http://localhost:8080/api/servicos/filtro/"+responsavel+"/"+status;
    }
    fetch(url)
    .then((response)=>{
      return response.text();
    }).then((text)=>{
      this.servicos = [];
      let servicos = JSON.parse(text);
      servicos.forEach(servico => {
        this.servicos.push(servico);
      });
    }).catch((e)=>{
      console.log("Não foi possível conectar com a API. \n" + e);
    })
  }
}
