import { Component, OnInit} from '@angular/core';
import {Contato} from '../shared/contato';
import {ContatoService} from '../shared/contato.service';
import {ContatoDataService} from '../shared/contato-data.service';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

contato: Contato;
key: string = '';
  constructor(private contatoService: ContatoService, 
    private ContatoDataService: ContatoDataService) { }

  ngOnInit() {
    this.contato = new Contato();
    
    this.ContatoDataService.currentContato.subscribe(data=>{
      if(data.key && data.contato){
        this.contato = new Contato();
        this.contato.name = data.contato.name;
        this.contato.cellphone =data.contato.cellphone;
        this.key = data.key;
      }
      
    })
  }


   onSubmit(){
     if(this.key){
       this.contatoService.update(this.contato, this.key)
     }else{
       this.contatoService.insert(this.contato);
     }
     this.contato = new Contato();
   }
}
