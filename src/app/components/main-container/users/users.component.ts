import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../../services/users.service';
import { IUser } from '../../../interfaces/IUser.interface';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit {

  constructor(private usersService: UsersService) {}

  users!: IUser[];
  filteredUsers!: IUser[];
  searchTerm: string = '';

  ngOnInit(): void {
      this.loadUsers();
  }

  loadUsers() {
    this.usersService.getAllUsers().subscribe((data: IUser[]) => {
      this.users = data;
      this.users.forEach(element => {
        element.urlImage = "../../../../assets/icons/User.svg";
        this.filteredUsers = this.users;
      });
    });
  }

  searchUsers() {
    if (!this.searchTerm.trim()) {
      this.filteredUsers = this.users; // Mostrar todos os livros se o campo de pesquisa estiver vazio
      return;
    }

    const lowerCaseSearch = this.searchTerm.toLowerCase().trim();
    this.filteredUsers = this.users.filter(user =>
      user.name.toLowerCase().includes(lowerCaseSearch) ||
      user.department.toLowerCase().includes(lowerCaseSearch) ||
      user.username.toLowerCase().includes(lowerCaseSearch)
    );
  }
}
