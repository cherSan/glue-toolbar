import {ChangeDetectionStrategy, Component, HostBinding, Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NzAvatarModule} from "ng-zorro-antd/avatar";
import {NzTypographyModule} from "ng-zorro-antd/typography";
import {NzIconModule} from "ng-zorro-antd/icon";
type Image = { url: string }
type Icon = { icon: string }
type Text = { text: string }
type Avatar = Image | Icon | Text;
@Component({
  selector: 'ui-navigation-item',
  standalone: true,
  imports: [CommonModule, NzAvatarModule, NzTypographyModule, NzIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './navigation-item.component.html',
  styleUrls: ['./navigation-item.component.scss'],
})
export class NavigationItemComponent {
  @Input() public title: string = '';
  @Input() public description: string = '';
  @Input() public avatar!: Avatar;
  @HostBinding('class.active') @Input() public active: boolean = false;
}
