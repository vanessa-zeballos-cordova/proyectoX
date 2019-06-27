import { Component, OnInit } from '@angular/core';
import { PeticionService } from '../../services/peticion.service';
import { trigger, state, style, transition, animate } from '@angular/animations';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  animations:[
      trigger('slide', [
          state('up', style({height: 0})),
          state('down', style({height: '*'})),
          transition('up <=> down', animate(200))
      ])
  ]
})

export class SidebarComponent implements OnInit {
  menus : any;
  submenus : any;
  constructor(private peticionS : PeticionService) {

  }

  ngOnInit() {
    this.peticionS.listTreePermit().subscribe(
        data => {
          this.menus = JSON.parse(JSON.stringify(eval("(" + data + ")")));
          console.log('this.menus',this.menus);
          this.menus.forEach(elemento => {elemento.nombre = elemento.nombre.split('"')[1]; elemento.active = false;elemento.cargado = false;});

          console.log('forEach', this.menus);
        },
        error=>{
          console.log('Error listTreePermit',error);
        }
    );
  }

  toggle(currentMenu) {

    if (currentMenu.tipo_dato === 'carpeta') {
        console.log('toggle', currentMenu);
      this.menus.forEach(element => {
        if (element === currentMenu) {
          currentMenu.active = !currentMenu.active;
        } else {
          element.active = false;
        }
      });
    }
  }

  getState(currentMenu) {
    //console.log('getState', currentMenu);
    if (currentMenu.active) {
      return 'down';
    } else {
      return 'up';
    }
  }

  listLeafPermit(currentMenu){ console.log('currentMenu Antes', currentMenu);

    if (currentMenu.tipo_dato === 'carpeta') {


            console.log('toggle', currentMenu);
            this.menus.forEach(element => {
                if (element === currentMenu) {
                    currentMenu.active = !currentMenu.active;
                } else {
                    element.active = false;
                }
            });
        console.log('currentMenu Despues', currentMenu);
        if (!currentMenu.cargado) {
            this.peticionS.listLeafPermit(currentMenu.id).subscribe(
                data => {
                    this.submenus = JSON.parse(JSON.stringify(eval("(" + data + ")")));
                    this.submenus.forEach(elemento => {
                        elemento.nombre = elemento.nombre.split('"')[1];
                        elemento.active = false;
                        elemento.cargado = false;
                    });

                    console.log('forEach', this.submenus);
                    currentMenu.cargado = true;
                },
                error => {
                    console.log('Error listTreePermit', error);
                }
            );
        }
    }else{
      console.log('Interfaces');
    }
  }

}
