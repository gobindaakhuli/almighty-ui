/*
 * Copyright 2016 Red Hat Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package redhat.developer.selenide.examples.almighty.ui.support.selenide;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * Marker annotation used to identify incomplete pages which are meant to be extended.
 *
 * Such page classes cannot be abstract as it is often handy to instantiate them -- e.g.
 * when you don't care about the specific page but rather about the parts common to
 * multiple pages
 *
 * Adapted from io.apiman.test.integration.ui.support.selenide.Layout.java by jcechace
 */
@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
public @interface Layout {
    String[] value() default "";
}
