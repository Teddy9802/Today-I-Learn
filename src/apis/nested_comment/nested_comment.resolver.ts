import { UseGuards } from '@nestjs/common';
import { Args, Context, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { IContext } from 'src/commons/context';
import { GqlAuthAccessGuard } from 'src/commons/gql-auth.guard';
import { NestedComment } from './entities/nested_comment.entity';
import { NestedCommentService } from './nested_comment.service';

@Resolver()
export class NestedCommentResolver {
  constructor(
    private readonly nestedCommentService: NestedCommentService, //
  ) {}

  @Query(() => [NestedComment])
  fetchNestedComments(
    @Args('commentId') commentId: string, //
    @Args('page', { nullable: true, type: () => Int }) page: number,
  ) {
    return this.nestedCommentService.findAll({ commentId, page });
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => NestedComment)
  createNestedComment(
    @Args('commentId') commentId: string, //
    @Args('nestedComment') nestedComment: string,
    @Context() context: IContext,
  ) {
    const user = context.req.user.id;
    return this.nestedCommentService.create({
      user,
      commentId,
      nestedComment,
    });
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => Boolean)
  deleteNestedComment(
    @Context() context: IContext,
    @Args('nestedCommentId') nestedCommentId: string,
  ) {
    const user = context.req.user.id;
    return this.nestedCommentService.delete({ nestedCommentId, user });
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => NestedComment)
  async updateNestedComment(
    @Context() context: IContext,
    @Args('nestedCommentId') nestedCommentId: string,
    @Args('updateNestedComment') updateNestedComment: string,
  ) {
    const user = context.req.user.id;

    return this.nestedCommentService.update({
      nestedCommentId,
      updateNestedComment,
      user,
    });
  }
}
