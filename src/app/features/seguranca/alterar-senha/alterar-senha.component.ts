import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AlterarSenha } from 'src/app/core/models/alterar-senha.model';
import { ToastService } from 'src/app/core/services/toast.service';
import { LoginService } from '../../login/login.service';






@Component({
  selector: 'app-alterar-senha',
  templateUrl: './alterar-senha.component.html',
  styleUrls: ['./alterar-senha.component.css']
})
export class AlterarSenhaComponent implements OnInit {


  alterarSenha = new AlterarSenha();

  constructor(private loginService: LoginService, private toastService: ToastService, private router: Router) { }

  ngOnInit(): void {
  }


  atualizar() {
    this.loginService.alterarSenha(this.alterarSenha)
    .then((resultado) => {
      if (resultado){
        this.toastService.addSingle("success", "", "Senha alterada com sucesso.")
        this.router.navigate(['/login']);
        return;
      }else{
        this.toastService.addSingle("error", "", "Senha antiga não confere.")
      }
      })
    .catch(erro => {
      this.toastService.addSingle('error', '', erro);
      return;
    });
  }

}
