import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UsersService } from '../../../services/users.service';
import { IUser } from '../../../interfaces/IUser.interface';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit {
  @Input() valueTemplateUserView = new EventEmitter<boolean>();
  @Output() sendUserInfo!: IUser;
  constructor(private usersService: UsersService) {}

  users!: IUser[];
  filteredUsers!: IUser[];
  searchTerm: string = '';
  templateUserView: boolean = false;

  undefinedUser: IUser = {
    id: 0,
    name: '',
    username: '',
    password: '',
    department: ''
  }

  ngOnInit(): void {
      this.loadUsers();
  }

  loadUsers() {
    this.usersService.getAllUsers().subscribe((data: IUser[]) => {
      this.users = data;
      this.users.forEach(element => {
        this.filteredUsers = this.users;
      });
    });
  }

  openUser(user: IUser) {
    this.sendUserInfo = user;
    this.templateUserView = true;
  }


  handleValueTemplateUserView(event: boolean) {
    this.templateUserView = event;

    if(!event) {
      this.loadUsers();
    }
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
