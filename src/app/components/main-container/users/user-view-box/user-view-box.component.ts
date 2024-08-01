import { Component } from '@angular/core';
import { IUser } from '../../../../interfaces/IUser.interface';
import { UsersService } from '../../../../services/users.service';

@Component({
  selector: 'app-user-view-box',
  templateUrl: './user-view-box.component.html',
  styleUrl: './user-view-box.component.scss'
})
export class UserViewBoxComponent {


  templateNewUser!: boolean;
  newUser!: IUser;
  user!: IUser;
  
  constructor(private _userService: UsersService) {}


  closeBox() {

  }

  saveUser() {

  }

  editUser() {

  }

  deleteUser() {

  }
}
