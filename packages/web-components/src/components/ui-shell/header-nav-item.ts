/**
 * Copyright IBM Corp. 2019, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ifDefined } from 'lit/directives/if-defined.js';
import { classMap } from 'lit/directives/class-map.js';
import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import { prefix } from '../../globals/settings';
import FocusMixin from '../../globals/mixins/focus';
import styles from './header.scss?lit';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';

/**
 * Header nav item.
 *
 * @element cds-header-nav-item
 * @csspart link The link.
 * @csspart title The title.
 */
@customElement(`${prefix}-header-nav-item`)
class CDSHeaderNavItem extends FocusMixin(LitElement) {
  /**
   * Link `href`.
   */
  @property()
  href!: string;

  /**
   * The link type.
   */
  @property({ reflect: true })
  rel!: string;

  /**
   * The link target.
   */
  @property({ reflect: true })
  target!: string;

  /**
   * The title.
   */
  @property()
  title!: string;

  /**
   * Applies selected styles to the item if a user sets this to true and `aria-current !== 'page'`.
   */
  @property({ type: Boolean, attribute: 'is-active' })
  isActive = false;

  /**
   * indicates that this element represents the current item
   */
  @property({ type: String, attribute: 'aria-current' })
  ariaCurrent;

  /**
   * As child of <ul>, this element must have role of listitem
   */
  @property({ reflect: true })
  role = 'listitem';

  render() {
    const { ariaCurrent, href, isActive, title, rel, target } = this;
    const linkClass = classMap({
      [`${prefix}--header__menu-item`]: true,
      [`${prefix}--header__menu-item--current`]:
        isActive && ariaCurrent !== 'page',
    });

    return html`
      <a
        part="link"
        class="${linkClass}"
        tabindex="0"
        href="${ifDefined(href)}"
        rel="${ifDefined(rel)}"
        target="${ifDefined(target)}">
        <span part="title" class="${prefix}--text-truncate--end"
          ><slot>${title}</slot></span
        >
      </a>
    `;
  }

  static shadowRootOptions = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
  };
  static styles = styles;
}

export default CDSHeaderNavItem;
