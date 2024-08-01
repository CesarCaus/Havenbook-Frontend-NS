import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IUser } from '../../../../interfaces/IUser.interface';
import { UsersService } from '../../../../services/users.service';

@Component({
  selector: 'app-user-view-box',
  templateUrl: './user-view-box.component.html',
  styleUrls: ['./user-view-box.component.scss']
})
export class UserViewBoxComponent implements OnInit {
  @Output() valueTemplateUserView = new EventEmitter<boolean>();
  @Output() userUpdated = new EventEmitter<void>();
  @Input() userInfo!: IUser;

  templateNewUser: boolean = true;
  user!: IUser;

  newUser: IUser = {
    id: 0,
    name: '',
    username: '',
    department: ''
  };

  constructor(private _userService: UsersService) {}

  ngOnInit(): void {

    this.user = {...this.userInfo};

    if (this.user) {
      if (this.user.id > 0) {
        this.templateNewUser = false;
        this.newUser = { ...this.user };
      } else {
        this.templateNewUser = true;
      }
    } else {
      console.error('user is null or undefined');
    }
  }

  editUser(): void {
    this.templateNewUser = true;
  }

  saveUser(): void {
    if (this.newUser.id > 0) {
      this._userService.updateUser(this.newUser.id, this.newUser).subscribe(
        (response) => {
          console.log('User updated successfully', response);
          this.userUpdated.emit();
          this.closeBox();
        },
        (error) => {
          console.error('Error updating user', error);
        }
      );
    } else {
      this._userService.addUser(this.newUser).subscribe(
        (response) => {
          console.log('User saved successfully', response);
          this.userUpdated.emit();
          this.closeBox();
        },
        (error) => {
          console.error('Error saving user', error);
        }
      );
    }
  }

  deleteUser(): void {
    this._userService.deleteUser(this.user.id).subscribe(
      (response) => {
        console.log('User deleted successfully', response);
        this.userUpdated.emit();
        this.closeBox();
      },
      (error) => {
        console.error('Error deleting user', error);
      }
    );
  }

  closeBox(): void {
    this.valueTemplateUserView.emit(false);
  }
}
