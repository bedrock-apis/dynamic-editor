# Packets Documentation
- [Packets Documentation](#packets-documentation)
  - [About](#about)
- [Server Packets](#server-packets)
  - [ServerUXEvents](#serveruxevents)
  - [ServerInputBindingEvents](#serverinputbindingevents)
  - [ServerActionEvents](#serveractionevents)
- [Client Packets](#client-packets)
  - [Client Life cycle](#client-life-cycle)
  - [Client UX Events](#client-ux-events)
  - [ClientActionEvents](#clientactionevents)
## About
# Server Packets
Packets being sended by server to clients.

## ServerUXEvents
## ServerInputBindingEvents
## ServerActionEvents




# Client Packets
Packets being received from clients.
## Client Life cycle
Received when EditorUI is ready or when player reopen suspended minecraft session 
> ## Packet Structure
> **Id**: `Editor::ClientLifecycle`
> 
> ### Types
> - [On Ready](#on-ready)

> #### On Ready
> ```ts
> {
>    "type": 1 //unique type
> }
> ```

## Client UX Events
Received when interaction with registred UI occurs. (Except build in UI Panes) 
> ## Packet Structure
> **Id**: `Editor::ClientUXEvents`
> 
> **Types**
> - [Pane Property Changed](#pane-property-changed)
> - [Tool Activation](#tool-activation)
> - [Visibility Changed](#visibility-changed)
> - [Collapse Mode Changed](#collapse-mode-changed)

> #### Pane property changed
> ```ts
> {
>    "type": 1 //unique type
>    "id": string //pane unique id
>    ...?: any //tests required
> }
> ```

> #### Tool Activation
> ```ts
> {
>    "type": 2, //unique type
>    "id": string //tool unique id
> }
> ```

> #### Visibility Changed
> ```ts
> {
>    "type": 3, //unique type
>    "id": string //pane unique id
>    ...?: any //tests required
> }
> ```

> #### Collapse Mode Changed
> ```ts
> {
>    "type": 4, //unique type
>    "id": string //pane unique id
>    ...?: any //tests required
> }
> ```

## ClientActionEvents
null