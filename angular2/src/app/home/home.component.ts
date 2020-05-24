import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../shared/user.service';
import { User } from '../shared/user.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers:[UserService]
})
export class HomeComponent implements OnInit {

  constructor(public _router : Router,
    public _userSerice: UserService) { }

  ngOnInit(): void {
    console.log('executado');
    this._userSerice.getUserList().subscribe((res) => {
      this._userSerice.users = res as User[];
      console.log(this._userSerice.users);
    });
  }

  funcHoteis(){
    this._router.navigate(['/hotel']);
  }

  verReservas(){
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const password = (document.getElementById('pass') as HTMLInputElement).value;
    console.log(email);
    if (email.length > 0){
      for (const u of this._userSerice.users){
        if (u.email === email && u.password === password){
          console.log('user.email: ' + email);
          console.log('user.password: ' + password);
          this._router.navigate(['/reservas', email]);
          return;
        } else if (u.email === email && u.password !== password) {
          (document.getElementById('email') as HTMLInputElement).value = '';
          (document.getElementById('pass') as HTMLInputElement).value = '';
          alert(email + ' está registado mas a password está incorreta');
          return;
        }
      }
      // this._router.navigate(['/reservas', email]);
    }
    (document.getElementById('email') as HTMLInputElement).value = '';
    (document.getElementById('pass') as HTMLInputElement).value = '';
    alert('Conta não existe');
  }

  criarConta(){
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const password = (document.getElementById('pass') as HTMLInputElement).value;
    for (const u of this._userSerice.users){
      if (u.email === email){
        (document.getElementById('email') as HTMLInputElement).value = '';
        (document.getElementById('pass') as HTMLInputElement).value = '';
        alert('email ja existe: ' + email);
        console.log('email ja existe: ' + email);
        return;
      }
    }
    const newUser: User = new User(email, password);
    this._userSerice.postUser(newUser).subscribe();
    alert('Conta criada com sucesso');
    console.log(email + '      ' + password);
    (document.getElementById('email') as HTMLInputElement).value = '';
    (document.getElementById('pass') as HTMLInputElement).value = '';
  }

}
